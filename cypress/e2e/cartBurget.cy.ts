import ingredients from '../fixtures/ingredients.json';

describe('проверяем доступность приложения', function() {
    it('сервис должен быть доступен по адресу localhost:5173', function() {
        cy.visit('http://localhost:4000');
    });
});
describe('Ingredients API', () => {
    // beforeEach выполняется перед каждым тестом
    beforeEach(() => {
        // Перехватываем GET-запрос на '/api/ingredients' и возвращаем данные из 'ingredients.json'
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    });

    // Тест, который проверяет, что ингредиенты загружаются правильно
    it('should display ingredients correctly', () => {
        cy.fixture('ingredients.json').then((fixtureData) => {
            // Переход на страницу приложения
            cy.visit('/'); // Замените на путь к вашей странице

            // Проверяем, что элементы с классом 'ingredient-item' (ингредиенты) отобразились
            cy.get('[data-cy="ingredient-name"]').should('have.length', fixtureData.data.length);

            fixtureData.data.forEach((item:any)=>{
                cy.get('[data-cy="ingredient-name"]').should('contain.text', item.name)
            })
        });
    });

    it('should add ingredient to the constructor', () => {
        cy.visit('/');
        const bun= "Краторная булка N-200i";
        const cartWithIngredient=cy.get('[data-cy="ingredient-wrapper"]').contains( bun).parent('[data-cy="ingredient-wrapper"]');
        const addButton= cartWithIngredient.contains('Добавить')
        addButton.click();

         cy.get('[data-cy="selected-bun"]').should('contain.text', bun)
    });

    it('should show modal with detailes of ingredient', function () {
        cy.visit('/');
        const bun= "Краторная булка N-200i";
        const cartWithIngredient=cy.get('[data-cy="ingredient-wrapper"]').contains( bun);
        cartWithIngredient.click();
        cy.contains('Детали ингредиента').should('exist')

        cy.get('[data-cy="modal-close-btn"').click()
        cy.contains('Детали ингредиента').should('not.exist')
    });
});
