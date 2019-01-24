const htmlTemplate = ({ body, styles }) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charSet="utf-8" class="next-head"/>
    <title class="next-head">Redeye kyc</title>
    <meta name="theme-color" content="#FFFFFF" class="next-head"/>
    <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no" class="next-head"/>
    <link href="https://fonts.googleapis.com/css?family=Oswald:200,300,400,500,600,700|Roboto:200,300,400,500,600,700,900" rel="stylesheet" class="next-head"/>
    <meta name="description" content="Redeye kyc" class="next-head"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap-reboot.min.css" class="next-head"/>
    ${styles}
  </head>
  <body>
    ${body}
  </body>
</html>
`;

module.exports = htmlTemplate;
