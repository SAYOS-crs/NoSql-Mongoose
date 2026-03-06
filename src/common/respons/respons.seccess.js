export function SuccessRespons({ status, massage, data = undefined, res }) {
  return res.status(status).json({ massage, data });
}
