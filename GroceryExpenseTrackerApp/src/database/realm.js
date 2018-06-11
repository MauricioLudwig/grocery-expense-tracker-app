import Realm from 'realm';

// Schema name
export const EXPENSE_SCHEMA = "Expense";
export const BUDGET_SCHEMA = "Budget";

// Model & properties
export const ExpenseSchema = {
    name: EXPENSE_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int', // primary key
        expense: { type: 'int', default: 0 },
        year: { type: 'int', default: 0 },
        month: { type: 'int', default: 0 },
        day: { type: 'int', default: 0 }
    }
};

export const BudgetSchema = {
    name: BUDGET_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int', // primary key
        value: { type: 'int', default: 0 }
    }
};

// Database options
const databaseOptions = {
    path: 'groceryExpenseTrackerApp.realm',
    schema: [ExpenseSchema, BudgetSchema],
    schemaVersion: 0 // Optional
}

// Get all expenses
export const getExpenses = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        let expenses = realm.objects(EXPENSE_SCHEMA).sorted([['year', true], ['month', true], ['day', true], ['id', true]]);
        resolve(expenses);
    }).catch((error) => {
        reject(error);
    });
});

// Add new expense to DB
export const addExpense = (newExpense) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
            realm.create(EXPENSE_SCHEMA, newExpense);
            resolve(newExpense);
        });
    }).catch((error) => {
        reject(error);
    });
});

// Delete expense from DB
export const deleteExpense = (expenseId) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
            let expense = realm.objectForPrimaryKey(EXPENSE_SCHEMA, expenseId);
            realm.delete(expense);
            resolve();
        });
    }).catch((error) => {
        reject(error);
    });
});

export default new Realm(databaseOptions);