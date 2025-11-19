// // import jwt from "jsonwebtoken";

// // const JWT_SECRET = process.env.JWT_SECRET || "mysecret";

// // // ✅ Verify JWT
// // export const authMiddleware = (req, res, next) => {
// //   const token = req.headers["authorization"]?.split(" ")[1];
// //   if (!token) return res.status(401).json({ error: "No token provided" });

// //   try {
// //     const decoded = jwt.verify(token, JWT_SECRET);
// //     req.user = decoded;
// //     next();
// //   } catch (err) {
// //     res.status(401).json({ error: "Invalid token" });
// //   }
// // };



// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET;
// if (!JWT_SECRET) {
//   throw new Error("❌ JWT_SECRET is not defined in environment variables");
// }

// export const authMiddleware = (req, res, next) => {
//   try {
//     const authHeader = req.headers["authorization"];

//     // ✅ Check if Authorization header exists and starts with Bearer
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ error: "Unauthorized: No token provided" });
//     }

//     const token = authHeader.split(" ")[1];

//     // ✅ Verify token
//     const decoded = jwt.verify(token, JWT_SECRET);

//     // ✅ Attach decoded user data to request
//     req.user = decoded;

//     next();
//   } catch (err) {
//     return res.status(401).json({
//       error:
//         err.name === "TokenExpiredError"
//           ? "Unauthorized: Token expired"
//           : "Unauthorized: Invalid token",
//     });
//   }
// };


// //shrey
// import jwt from "jsonwebtoken";

// export const authMiddleware = (req, res, next) => {
//   try {
//     const authHeader = req.headers["authorization"];

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ error: "Unauthorized: Token missing" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // FINAL FIX — Auto detect both id/userId
//     req.user = {
//       id: decoded.id || decoded.userId,
//       userId: decoded.id || decoded.userId,   // Same, to avoid future bugs
//       roleId: decoded.roleId,
//       username: decoded.username,
//     };

//     if (!req.user.id) {
//       console.log("❌ Token does not contain userId:", decoded);
//       return res.status(401).json({ error: "Invalid token (Missing ID)" });
//     }

//     next();
//   } catch (err) {
//     console.log("AUTH ERROR:", err);
//     return res.status(401).json({
//       error:
//         err.name === "TokenExpiredError"
//           ? "Token expired"
//           : "Invalid or corrupted token",
//     });
//   }
// };


import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Support multiple token claim names and normalize to req.user.id
    const id = decoded.id || decoded.userId || decoded.user_id || decoded.sub;

    req.user = {
      id: id,
      userId: id,
      roleId: decoded.roleId || decoded.role || null,
      username: decoded.username || null,
    };

    if (!req.user.id) {
      return res.status(401).json({ error: "Invalid token: missing id" });
    }

    next();
  } catch (err) {
    console.log("AUTH ERROR:", err);
    return res.status(401).json({
      error: err.name === "TokenExpiredError" ? "Token expired" : "Invalid token",
    });
  }
};
