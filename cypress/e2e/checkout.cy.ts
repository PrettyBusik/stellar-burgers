import ingredients from '../fixtures/ingredients.json';

describe('Checkout form', () => {
    // beforeEach выполняется перед каждым тестом
    beforeEach(() => {
        // Перехватываем GET-запрос на '/api/ingredients' и возвращаем данные из 'ingredients.json'
        cy.intercept('GET', '/api/ingredients', {fixture: 'ingredients.json'});
        cy.intercept('GET', '/api/auth/user', {fixture: 'user.json'});
        cy.intercept('POST', '/api/orders', {fixture: 'createdOrder.json'});
    });

    // Тест, который проверяет, что ингредиенты загружаются правильно
    it('should work', () => {
        cy.fixture('createdOrder.json').then((createdOrderFixture) => {
            const bunName = "Краторная булка N-200i";
            const ingredientName = "Мясо бессмертных моллюсков Protostomia";

            cy.visit('/');

            cy
                .get('[data-cy="ingredient-wrapper"]')
                .contains(bunName)
                .parent('[data-cy="ingredient-wrapper"]')
                .contains('Добавить')
                .click();

            cy
                .get('[data-cy="ingredient-wrapper"]')
                .contains(ingredientName)
                .parent('[data-cy="ingredient-wrapper"]')
                .contains('Добавить')
                .click();

            cy.get('[data-cy="checkout-btn"').click()
            cy.get('[data-cy="created-order-number"]').should('have.text', createdOrderFixture.order.number)


            cy.get('[data-cy="modal-close-btn"]').click()
            cy.get('[data-cy="created-order-number"]').should('not.exist')
            cy.get('[data-cy="selected-bun"]').should('not.exist')
            cy.get('[data-cy="selected-ingredient"]').should('not.exist')
        })
    });
});
