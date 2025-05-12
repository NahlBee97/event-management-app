import cron from "node-cron";

async function VerifyUserTask() {
    // * pertama menandakan menit (0-59)
    // * kedua menandakan jam (0-23)
    // * ketiga menandakan hari dalam bulan (1-31)
    // * keempat menandakan bulan (1-12)
    // * kelima menandakan hari dalam minggu (0-7)
    cron.schedule("*/15 * * * *", () => {
    });
}

export { VerifyUserTask }