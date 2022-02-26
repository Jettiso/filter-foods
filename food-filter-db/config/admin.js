module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '7a7373613d35f5f2557f3aa232240900'),
  },
});
