# SD437 Term Project: NFT Tracker

This repository contains the code for the NFT Tracker project. The project is a web application that allows users to track the price of NFTs on the Ethereum blockchain.

## Running the Project

### Requirements
The application expects the following environment variables to be set:

- Database (for persistence)
  - `DB_HOST` - The host of the database
  - `DB_PORT` - The port of the database
  - `DB_USERNAME` - The username of the database
  - `DB_PASSWORD` - The password of the database
  - `DB_DATABASE` - The name of the database
- Data API (for retrieving NFT data)
  - `ETHERSCAN_API_KEY` - The API key for [Etherscan](https://etherscan.io/apis)
- Notification API (for sending notifications)
  - `TWILIO_ACCOUNT_SID` - The account SID for [Twilio](https://www.twilio.com/docs/usage/api)
  - `TWILIO_AUTH_TOKEN` - The auth token for Twilio
  - `TWILIO_FROM_PHONE_NUMBER` - The phone number for Twilio
  - `SENDGRID_API_KEY` - The API key for [SendGrid](https://sendgrid.com/docs/for-developers/sending-email/api-getting-started/)

### Local Development
To install the project, run the following commands:

```bash
npm install

npm run dev # for development

npm run build # for production
npm start
```



During local development, the environment variables can be set in a `.env.local` file in the root directory of the project.

### Docker
To install the project using Docker, run the following commands:

```bash
docker build -t nft-tracker .
docker run -p 3000:3000 nft-tracker -e DB_HOST=... -e DB_PORT=... -e DB_USERNAME=... -e DB_PASSWORD=... -e DB_DATABASE=... -e ETHERSCAN_API_KEY=... -e TWILIO_ACCOUNT_SID=... -e TWILIO_AUTH_TOKEN=... -e TWILIO_FROM_PHONE_NUMBER=... -e SENDGRID_API_KEY=...
```