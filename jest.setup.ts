export default async () => {
    console.log('jest.setup.ts');
    process.env.DB_HOST='foo';
    process.env.DB_PORT='foo';
    process.env.DB_USERNAME='foo';
    process.env.DB_PASSWORD='foo';
    process.env.DB_DATABASE='foo';
    process.env.ETHERSCAN_API_KEY='foo';
    process.env.TWILIO_ACCOUNT_SID='foo';
    process.env.TWILIO_AUTH_TOKEN='foo';
    process.env.TWILIO_FROM_PHONE_NUMBER='foo';
}