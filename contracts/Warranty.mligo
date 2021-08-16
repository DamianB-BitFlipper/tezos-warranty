(**
Implementation of the FA2 interface for the NFT contract supporting multiple
types of NFTs. Each NFT type is represented by the range of token IDs - `token_def`.
 *)

type token_id = nat

type token_info = 
  [@layout:comb]
    {
      (* Pertinent entities *)
      owner: address;
      issuer: address;

      (* Warranty details *)
      serial_number: string;
      issue_time: timestamp;
      warranty_duration: nat;   (* In days *)
      link_to_warranty_conditions: bytes;

      (* Warranty mechanics *)
      num_transfers_allowed: nat;
    }

type transfer_destination =
  [@layout:comb]
    {
      to_ : address;
      token_id : token_id;
      amount : nat;
    }

type transfer =
  [@layout:comb]
    {
      from_ : address;
      txs : transfer_destination list;
    }

type balance_of_request =
  [@layout:comb]
    {
      owner : address;
      token_id : token_id;
    }

type balance_of_response =
  [@layout:comb]
    {
      request : balance_of_request;
      balance : nat;
    }

type balance_of_params =
  [@layout:comb]
    {
      requests : balance_of_request list;
      callback : (balance_of_response list) contract;
    }

type operator_params =
  [@layout:comb]
    {
      owner : address;
      operator : address;
      token_id: token_id;
    }

type update_operator =
  [@layout:comb]
| Add_operator of operator_params
| Remove_operator of operator_params

type token_metadata =
  [@layout:comb]
    {
      token_id : token_id;
      token_info : token_info;
    }

(*
One of the options to make token metadata discoverable is to declare
`token_metadata : token_metadata_storage` field inside the FA2 contract storage
 *)
type token_metadata_storage = (token_id, token_metadata) big_map

type mint_params =
  [@layout:comb]
    {
      (* Pertinent entities *)
      owner: address;

      (* Warranty details *)
      serial_number: string;
      warranty_duration: nat;   (* In days *)
      link_to_warranty_conditions: bytes;

      (* Warranty mechanics *)
      num_transfers_allowed: nat;
    }

type simple_admin_storage = 
    [@layout:comb]
      {
        admin : address;
        pending_admin : address option;
      }

type fa2_entry_points =
  (* Asset operations *)
  | Transfer of transfer list
  | Balance_of of balance_of_params
  | Update_operators of update_operator list
  | Mint of mint_params
  (* Admin operations *)
  | Set_admin of address
  | Confirm_admin of unit

(* 
 TZIP-16 contract metadata storage field type. 
 The contract storage MUST have a field
 `metadata : contract_metadata`
 *)
type contract_metadata = (string, bytes) big_map

(** One of the specified `token_id`s is not defined within the FA2 contract *)
let fa2_token_undefined = "FA2_TOKEN_UNDEFINED" 
(** 
A token owner does not have sufficient balance to transfer tokens from
owner's account 
 *)
let fa2_insufficient_balance = "FA2_INSUFFICIENT_BALANCE"
(** A transfer failed because of `operator_transfer_policy == No_transfer` *)
let fa2_tx_denied = "FA2_TX_DENIED"
(** 
A transfer failed because `operator_transfer_policy == Owner_transfer` and it is
initiated not by the token owner 
 *)
let fa2_not_owner = "FA2_NOT_OWNER"
(**
A transfer failed because `operator_transfer_policy == Owner_or_operator_transfer`
and it is initiated neither by the token owner nor a permitted operator
 *)
let fa2_not_operator = "FA2_NOT_OPERATOR"


(**
The transfer of an warranty NFT is not permitted according to its defined mechanics
 *)
let err_transfer_not_permitted = "TRANSFER_NOT_PERMITTED"

(* 
  Permission policy definition. 
  Stored in the TZIP-16 contract metadata JSON
 *)

type operator_transfer_policy =
  [@layout:comb]
| No_transfer
| Owner_transfer
| Owner_or_operator_transfer

(** 
(owner, operator, token_id) -> unit
To be part of FA2 storage to manage permitted operators
 *)
type operator_storage = ((address * (address * token_id)), unit) big_map

(** 
  Updates operator storage using an `update_operator` command.
  Helper function to implement `Update_operators` FA2 entrypoint
 *)
let update_operators (update, storage : update_operator * operator_storage)
    : operator_storage =
  match update with
  | Add_operator op -> 
     Big_map.update (op.owner, (op.operator, op.token_id)) (Some unit) storage
  | Remove_operator op -> 
     Big_map.remove (op.owner, (op.operator, op.token_id)) storage

(**
Validate if operator update is performed by the token owner.
@param updater an address that initiated the operation; usually `Tezos.sender`.
 *)
let validate_update_operators_by_owner (update, updater : update_operator * address)
    : unit =
  let op = match update with
    | Add_operator op -> op
    | Remove_operator op -> op
  in
  if op.owner = updater then unit else failwith fa2_not_owner

(**
  Generic implementation of the FA2 `%update_operators` entrypoint.
  Assumes that only the token owner can change its operators.
 *)
let fa2_update_operators (updates, storage
                                   : (update_operator list) * operator_storage) : operator_storage =
  let updater = Tezos.sender in
  let process_update = (fun (ops, update : operator_storage * update_operator) ->
      let _u = validate_update_operators_by_owner (update, updater) in
      update_operators (update, ops)
    ) in
  List.fold process_update updates storage

(** 
  owner * operator * token_id * ops_storage -> unit
 *)
type operator_validator = (address * address * token_id * operator_storage)-> unit

(**
Default implementation of the operator validation function.
The default implicit `operator_transfer_policy` value is `Owner_or_operator_transfer`
 *)
let default_operator_validator : operator_validator =
  (fun (owner, operator, token_id, ops_storage 
                                   : address * address * token_id * operator_storage) ->
    if owner = operator
    then unit (* transfer by the owner *)
    else if Big_map.mem (owner, (operator, token_id)) ops_storage
    then unit (* the operator is permitted for the token_id *)
    else failwith fa2_not_operator (* the operator is not permitted for the token_id *)
  )

(**
Checks whether a warranty NFT has not expired.
*)
let is_not_expired (token_info : token_info) : bool = 
  let one_day : int = 86400 in
  let still_valid = Tezos.now < token_info.issue_time + (token_info.warranty_duration * one_day) in
  still_valid

(**
Fails if the sender of the transaction is not the current admin
*)
let fail_if_not_admin (a : simple_admin_storage) : unit =
  if Tezos.sender <> a.admin
  then failwith "NOT_AN_ADMIN"
  else unit

(* range of nft tokens *)
type token_def =
  [@layout:comb]
    {
      from_ : nat;
      to_ : nat;
    }

type nft_meta = (token_def, token_metadata) big_map

type ledger = (token_id, address) big_map
type reverse_ledger = (address, token_id list) big_map

type nft_token_storage = {
    ledger : ledger;
    operators : operator_storage;
    reverse_ledger : reverse_ledger;
    metadata : contract_metadata;
    token_metadata : token_metadata_storage;
    next_token_id : token_id;
    admin : simple_admin_storage;
  }

(** 
Retrieve the balances for the specified tokens and owners
@return callback operation
 *)
let get_balance (p, ledger, token_metadata : balance_of_params * ledger * token_metadata_storage) : operation =
  let to_balance = fun (r : balance_of_request) ->
    let owner = Big_map.find_opt r.token_id ledger in
    let tk_meta = Big_map.find_opt r.token_id token_metadata in
    match (owner, tk_meta) with
    | None, _ -> (failwith fa2_token_undefined : balance_of_response)
    | _, None -> (failwith fa2_token_undefined : balance_of_response)
    | Some o, Some tk_m ->
       let bal = if o = r.owner && is_not_expired (tk_m.token_info)
                 then 1n 
                 else 0n in
       { request = r; balance = bal; }
  in
  let responses = List.map to_balance p.requests in
  Tezos.transaction responses 0mutez p.callback

let transfer_update_ledger (token_id, to_addr, ledger : token_id * address * ledger) : ledger = 
  Big_map.update token_id (Some to_addr) ledger

let transfer_update_reverse_ledger (token_id, from_addr, to_addr, reverse_ledger : token_id * address * address * reverse_ledger) : reverse_ledger = 
  (* Removes token id from sender *)
  let new_rv = 
    match Big_map.find_opt from_addr reverse_ledger with
    | None -> (failwith fa2_insufficient_balance : reverse_ledger)
    | Some tk_id -> 
       Big_map.update 
         from_addr
         (Some (List.fold (
                    fun (new_list, tk_id_l: token_id list * token_id) ->
                    if tk_id_l = token_id
                    then new_list
                    else tk_id_l :: new_list
                  ) tk_id ([]: token_id list))) 
         reverse_ledger
  in
  (* Adds token id to recipient *)
  let updated_rv = 
    match Big_map.find_opt to_addr new_rv with
    | None -> Big_map.add to_addr [token_id] new_rv
    | Some tk_id -> Big_map.update to_addr (Some (token_id :: tk_id)) new_rv in
  updated_rv

let transfer_update_token_metadata (token_id, token_metadata : token_id * token_metadata_storage) : token_metadata_storage = 
  (* Advance the warranty NFT according to its defined mechanics *)
  match Big_map.find_opt token_id token_metadata with
  | None -> (failwith fa2_insufficient_balance : token_metadata_storage)
  | Some tk_meta ->
     let tk_info = tk_meta.token_info in
     (* Decrements the transfers allowed by 1 *)
     let new_num_transfers = tk_info.num_transfers_allowed - 1n in
     (* Check if the warranty is still valid *)
     let still_valid = is_not_expired (tk_info) in
     if new_num_transfers < 0 || still_valid <> true
     then (failwith err_transfer_not_permitted : token_metadata_storage)
     else 
       let new_token_metadata = Big_map.update token_id 
                                  (Some {tk_meta with token_info.num_transfers_allowed = abs (new_num_transfers) })
                                  token_metadata in 
       new_token_metadata

(**
Update leger balances according to the specified transfers. Fails if any of the
permissions or constraints are violated.
@param txs transfers to be applied to the ledger
@param validate_op function that validates of the tokens from the particular owner can be transferred. 
 *)
let transfer (txs, validate_op, ops_storage, ledger, reverse_ledger, token_metadata
                                                                     : (transfer list) * operator_validator * operator_storage * ledger * reverse_ledger * token_metadata_storage) : ledger * reverse_ledger * token_metadata_storage =
  (* Process individual transfer *)
  let make_transfer = (fun ((l, rv_l, tm), tx : (ledger * reverse_ledger * token_metadata_storage) * transfer) ->
      List.fold (fun ((l, rv_l, tm), dst : (ledger * reverse_ledger * token_metadata_storage) * transfer_destination) ->
          if dst.amount = 0n
          then l, rv_l, tm
          else if dst.amount <> 1n
          then (failwith fa2_insufficient_balance : ledger * reverse_ledger * token_metadata_storage)
          else
            let owner = Big_map.find_opt dst.token_id l in
            match owner with
            | None -> (failwith fa2_token_undefined : ledger * reverse_ledger * token_metadata_storage)
            | Some o -> 
               if o <> tx.from_
               then (failwith fa2_not_owner : ledger * reverse_ledger * token_metadata_storage)
               else let _u = validate_op (o, Tezos.sender, dst.token_id, ops_storage) in
                    let new_l = transfer_update_ledger (dst.token_id, dst.to_, l) in
                    let new_rv = transfer_update_reverse_ledger (dst.token_id, tx.from_, dst.to_, rv_l) in
                    let new_token_metadata = transfer_update_token_metadata (dst.token_id, tm) in
                    new_l, new_rv, new_token_metadata
        ) tx.txs (l, rv_l, tm)
    ) in 
  let (l, rv_l, new_token_metadata) = List.fold make_transfer txs (ledger, reverse_ledger, token_metadata) in 
  (l, rv_l, new_token_metadata)

let mint (p, s: mint_params * nft_token_storage): nft_token_storage =
  (* Only the current admin may mint warranty NFTs *)
  let _u = fail_if_not_admin (s.admin) in
  let token_id = s.next_token_id in
  let token_info = { owner = p.owner; 
                     issuer = Tezos.sender; 
                     serial_number = p.serial_number;
                     issue_time = Tezos.now;
                     warranty_duration = p.warranty_duration;
                     link_to_warranty_conditions = p.link_to_warranty_conditions;
                     num_transfers_allowed = p.num_transfers_allowed; 
                   } in
  (* Updates the ledger *)
  let new_ledger = Big_map.add token_id p.owner s.ledger in
  (* Updates the reverse ledger *)
  let new_reverse_ledger = 
    match Big_map.find_opt p.owner s.reverse_ledger with
    | None -> Big_map.add p.owner [token_id] s.reverse_ledger
    | Some l -> Big_map.update p.owner (Some (token_id :: l)) s.reverse_ledger in
  (* Stores the metadata *)
  let new_entry = { token_id = token_id; token_info = token_info } in
  
  { 
    s with 
    ledger = new_ledger;
    reverse_ledger = new_reverse_ledger;
    token_metadata = Big_map.add token_id new_entry s.token_metadata;
    next_token_id = token_id + 1n;
  }

let set_admin (new_admin, s : address * simple_admin_storage) : simple_admin_storage =
  { s with pending_admin = Some new_admin; }

let confirm_new_admin (s : simple_admin_storage) : simple_admin_storage =
  match s.pending_admin with
  | None -> (failwith "NO_PENDING_ADMIN" : simple_admin_storage)
  | Some pending ->
    if Tezos.sender = pending
    then {s with 
      pending_admin = (None : address option);
      admin = Tezos.sender;
    }
    else (failwith "NOT_A_PENDING_ADMIN" : simple_admin_storage)

(* TODO: 
   - Try to split code into separate files.
   - Separate asset functionality from management functionality in `main`
   - Make all failwith errors into constant variables
 *)
let main (param, storage : fa2_entry_points * nft_token_storage)
    : (operation  list) * nft_token_storage =
  match param with
  | Transfer txs ->
     let (new_ledger, new_reverse_ledger, new_token_metadata) = 
       transfer (txs, default_operator_validator, storage.operators, 
                 storage.ledger, storage.reverse_ledger, storage.token_metadata) in
     let new_storage = { storage with ledger = new_ledger; 
                                      reverse_ledger = new_reverse_ledger;
                                      token_metadata = new_token_metadata } in
     ([] : operation list), new_storage

  | Balance_of p ->
     let op = get_balance (p, storage.ledger, storage.token_metadata) in
     [op], storage

  | Update_operators updates ->
     let new_ops = fa2_update_operators (updates, storage.operators) in
     let new_storage = { storage with operators = new_ops; } in
     ([] : operation list), new_storage

  | Mint p ->
     ([]: operation list), mint (p, storage)

  | Set_admin addr ->
     let new_admin = set_admin (addr, storage.admin) in
     ([]: operation list), { storage with admin = new_admin }

  | Confirm_admin ->
     let confirmed_admin = confirm_new_admin (storage.admin) in
     ([]: operation list), { storage with admin = confirmed_admin }

(* let store : nft_token_storage = {
 *     ledger = (Big_map.empty: (token_id, address) big_map);
 *     operators = (Big_map.empty: ((address * (address * token_id)), unit) big_map);
 *     reverse_ledger = (Big_map.empty: (address, token_id list) big_map);
 *     metadata = Big_map.literal [
 *                    ("", Bytes.pack("tezos-storage:contents"));
 *                    ("contents", ("7b2276657273696f6e223a2276312e302e30222c226e616d65223a2254555473222c22617574686f7273223a5b2240636c617564656261726465225d2c22696e7465726661636573223a5b22545a49502d303132222c22545a49502d303136225d7d": bytes))
 *                  ];
 *     token_metadata = (Big_map.empty: (token_id, token_metadata) big_map);
 *     next_token_id = 0n;
 *     admin = { admin = ("tz1Me1MGhK7taay748h4gPnX2cXvbgL6xsYL": address); pending_admin = (None : address option)};
 *   } *)

