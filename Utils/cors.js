const whitelist = ['http://localhost:4000',"https://vendor-front-kappa.vercel.app/"];
export default  function (req, callback) {
  let corsOptions;
//   if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true,
      credentials: true,
      withCredentials: true,
      methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    };
//   } else {
//     corsOptions = { origin: false };
//   }
  callback(null, corsOptions);
};
