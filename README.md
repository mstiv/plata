# Plata

Digital wallet, cards, crypto and payments app (EN / ES / RU).

Separate from Stater/Statera — reuse visual language only, no brand traces.

## Run for Teams

```bash
cd plata
./serve.sh
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173) and share the browser window in Teams.

Default language: Spanish. Switch EN / ES / RU in the left rail.

Presenter keys: `1`–`7` switch modules, `←` / `→` step through them, `E` / `S` / `R` change language.
Use the browser in full screen (`⌃⌘F`) before sharing for the cleanest view.

## Modules

- Home & transfers
- Cards (Visa / Mastercard / Mir)
- Crypto wallets (9 chains / 64 assets narrative)
- Scan2Pay
- Marketplace (multi-currency)
- Stablecoins

## Structure

```
plata/
├── README.md
├── serve.sh
└── web/          # static web app
```
