# is-pw-pwned
Check if password has been pwned, leaked, cracked or is known.

Uses the awesome https://haveibeenpwned.com/ range search to see if a password has been pwned previously or not.

-> Takes in a password

-> hashes using SHA1

-> Send the first 5 chars of the hash to the range search API

-> potential matches will be returned that match the first 5 chars of the hash

-> if the actual hash contains the exacts password hash then the password has been pwned

Exit with `CTRL+C`
