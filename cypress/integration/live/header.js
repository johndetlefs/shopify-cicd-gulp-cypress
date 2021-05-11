const views = ["iphone-5", "ipad-2", "macbook-13", "macbook-16"];
const mobile = ["iphone-5", "ipad-2"];

describe("Header", () => {
  before(() => {
    cy.login();
    cy.visit("");
    cy.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
  });

  describe("Logo", () => {
    views.forEach((view) => {
      context(`${view}`, () => {
        beforeEach(() => {
          cy.viewport(view);
        });

        it("Logo should show", () => {
          if (mobile.includes(view)) {
            cy.get("[data-cy='mobile-header'] [data-cy='logo-img'] svg").should(
              "be.visible"
            );
            cy.get(
              "[data-cy='desktop-header'] [data-cy='logo-img'] svg"
            ).should("not.be.visible");
          } else {
            cy.get(
              "[data-cy='desktop-header'] [data-cy='logo-img'] svg"
            ).should("be.visible");
            cy.get("[data-cy='mobile-header'] [data-cy='logo-img'] svg").should(
              "not.be.visible"
            );
          }
        });

        it("Logo should have fallback text", () => {
          if (mobile.includes(view)) {
            cy.get(
              "[data-cy='mobile-header'] [data-cy='logo-fallback-text']"
            ).should(($span) => {
              expect($span.text()).to.have.length.of.at.least(5);
            });
          } else {
            cy.get(
              "[data-cy='desktop-header'] [data-cy='logo-fallback-text']"
            ).should(($span) => {
              expect($span.text()).to.have.length.of.at.least(5);
            });
          }
        });
      });
    });
  });
});
