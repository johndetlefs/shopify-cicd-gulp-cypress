const themeId = Cypress.env("themeId");
const password = Cypress.env("password");

Cypress.Commands.overwrite("visit", (originalFn, url, options) => {
  let full_path = `${url}?preview_theme_id=${themeId}`;
  return originalFn(full_path, options);
});

// Create automated login to get through password page on sandbox stores
Cypress.Commands.add("login", () => {
  Cypress.log({
    name: "loginByForm",
    message: `Logging in with password: ${password}`,
  });

  return cy.request({
    method: "POST",
    url: "/password",
    form: true,
    body: {
      password,
    },
  });
});
