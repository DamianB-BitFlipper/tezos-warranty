#!/bin/bash

LIGO=/home/damian/Documents/Educational/personal/tezos/ligo
CONTRACT=/home/damian/Documents/Educational/personal/tezos/warranty/contracts/Warranty2.mligo

# Call the ligo dry-run command
$LIGO dry-run $CONTRACT main "Added 42n" '
{
    ledger = (Big_map.empty: (token_id, address) big_map);
    operators = (Big_map.empty: ((address * (address * token_id)), unit) big_map);
    reverse_ledger = (Big_map.empty: (address, token_id list) big_map);
    metadata = Big_map.literal [
                   ("", Bytes.pack("tezos-storage:contents"));
                   ("contents", ("7b2276657273696f6e223a2276312e302e30222c226e616d65223a2254555473222c22617574686f7273223a5b2240636c617564656261726465225d2c22696e7465726661636573223a5b22545a49502d303132222c22545a49502d303136225d7d": bytes))
                 ];
    token_metadata = (Big_map.empty: (token_id, token_metadata) big_map);
    next_token_id = 0n;
    admin = ("tz1Me1MGhK7taay748h4gPnX2cXvbgL6xsYL": address);
}
'
