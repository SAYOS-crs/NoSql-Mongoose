export function SuccessRespons({
  status = 200,
  massage,
  data = undefined,
  res,
}) {
  return res.status(status).json({ massage, data });
}
export function Successfly_Login({ res, token }) {
  return res.status(200).json({ massage: "login successfly", token });
}
