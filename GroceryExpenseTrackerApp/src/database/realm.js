import Realm from 'realm';
import { getMonths } from '../constants';

// Schema name
export const EXPENSE_SCHEMA = "Expense";

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

// DB options
const databaseOptions = {
    path: 'groceryExpenseTrackerApp.realm',
    schema: [ExpenseSchema],
    schemaVersion: 0 // Optional
}

// Get all expenses from DB
export const getExpenses = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        let expenses = realm.objects(EXPENSE_SCHEMA).sorted([['year', true], ['month', true], ['day', true], ['id', true]]);
        // Limit number of expenses to return to 100
        let limitExpenses = expenses.slice(0, 100)
        resolve(limitExpenses);
    }).catch((error) => {
        reject(error);
    });
});

// Get all expenses for current year
export const getExpensesForYear = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {

        // Filter all expenses for the given year
        let today = new Date();
        let currentYear = today.getFullYear();
        let currentMonth = today.getMonth() + 1;
        let expenses = realm.objects(EXPENSE_SCHEMA)
            .filtered(`year == ${currentYear}`);

        let result = [];
        let months = getMonths();

        for (let i = 0; i < months.length; i++) {

            let monthExpense = expenses
                .filter(o => o.month == (i + 1))
                .map(m => m);

            if (monthExpense.length < 1) {
                continue;
            }

            let sum = 0;

            for (let y = 0; y < monthExpense.length; y++) {
                sum += monthExpense[y].expense;
            };

            if (sum > 0) {
                result.push({
                    monthValue: months[i].value,
                    monthLabel: months[i].label,
                    sum: sum
                });
            }

        };
        resolve(result);
    }).catch(error => {
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

// Clear DB
export const clearDb = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
            realm.deleteAll();
            resolve();
        });
    }).catch(error => {
        reject(error)
    });
});

export default new Realm(databaseOptions);