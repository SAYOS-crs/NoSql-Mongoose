export function throwResponsError({ status, massage, Detals, res }) {
  return res.status(status).json({ Error: massage, Detals });
}

export function NotFoundError_Respons({ res, Detals = undefined }) {
  return throwResponsError({ status: 404, massage: "Not Found", Detals, res });
}

export function ConflictError_Respons({ res, Detals = undefined }) {
  return throwResponsError({
    status: 409,
    massage: "Conflict Error",
    Detals,
    res,
  });
}
