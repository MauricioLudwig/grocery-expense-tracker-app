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

// Get all expenses
export const getExpenses = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        let expenses = realm.objects(EXPENSE_SCHEMA).sorted([['year', true], ['month', true], ['day', true], ['id', true]]);
        // Limit number of expenses to return to 50
        let limitExpenses = expenses.slice(0, 50)
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

// Get daily expenses for current month
export const getExpensesForMonth = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {

        // Filter all expenses for the given year
        let today = new Date();
        let currentYear = today.getFullYear();
        let currentMonth = today.getMonth() + 1;
        let expenses = realm.objects(EXPENSE_SCHEMA)
            .filtered(`year == ${currentYear} && month == ${currentMonth}`)
            .sorted('day');

        let result = [];
        let maxSum = 0;

        for (let i = 1; i < 31; i++) {

            let filterSameDays = expenses
                .filtered(`day == ${i}`);

            if (filterSameDays.length > 0) {

                let sum = filterSameDays.sum('expense');

                if (maxSum < sum) {
                    maxSum = sum;
                };

                result.push({
                    day: i,
                    sum: sum
                });
            };

        };

        let payload = {
            maxSum,
            result
        };

        resolve(payload);

    }).catch(error => {
        reject(error);
    });
});

// Get sum of expenses for current month
export const getSumOfMonthExpenses = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {

        // Filter all expenses for current month
        let today = new Date();
        let currentYear = today.getFullYear();
        let currentMonth = today.getMonth() + 1;
        let expenses = realm.objects(EXPENSE_SCHEMA)
            .filtered(`year == ${currentYear} && month == ${currentMonth}`)
            .sum('expense');

        resolve(expenses);

    }).catch(error => {
        reject(error);
    });
});

// Add new expense
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

// Delete expense
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