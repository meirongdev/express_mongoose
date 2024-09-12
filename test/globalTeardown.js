export default async function globalTeardown() {
  const mongoServer = global.__MONGOINSTANCE
  if (mongoServer) {
    await mongoServer.stop()
  }
}
