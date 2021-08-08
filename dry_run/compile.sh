#!/bin/bash

LIGO=/home/damian/Documents/Educational/personal/tezos/ligo
CONTRACT=/home/damian/Documents/Educational/personal/tezos/warranty/contracts/Warranty.mligo

# Call the `ligo compile-contract` command
$LIGO compile-contract $CONTRACT main
