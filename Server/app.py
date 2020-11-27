from flask import Flask, request, jsonify
import json
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

def db_connection():
    conn = None
    try:
        conn = sqlite3.connect('cars.sqlite')
    except sqlite3.error as e:
        print(e)
    return conn

@app.route('/GET/employees', methods=["GET"])
def employees():
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM employees")
    employees = [
        dict(id=row[0], name=row[1])
        for row in cursor.fetchall()
    ]
    if employees is not None:
        return jsonify(employees)


@app.route('/GET/carmodels', methods=["GET"])
def carmodels():
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM carmodels")
    carmodels = [
        dict(id=row[0], brand=row[1], model=row[2], price=row[3])
        for row in cursor.fetchall()
    ]
    if carmodels is not None:
        return jsonify(carmodels)


@app.route('/POST/carmodels', methods=["POST"])
def postCar():
    conn = db_connection()
    cursor = conn.cursor()
    new_brand = request.form["brand"]
    new_model = request.form["model"]
    new_price = request.form["price"]
    sql = """INSERT INTO carmodels(brand, model, price) VALUES (?, ?, ?)"""
    cursor = cursor.execute(sql, ( new_brand, new_model, new_price))
    conn.commit()
    new_obj = {"id": cursor.lastrowid, "brand": new_brand, "model": new_model, "price": new_price}
    return jsonify(new_obj)


@app.route('/DELETE/carmodels/<int:id>', methods=["DELETE"])
def deletecar(id):
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("""SELECT * FROM carmodels WHERE id=?""", (id,))
    car = cursor.fetchall()
    conn.execute("""DELETE FROM carmodels WHERE id =?""", (id,))
    conn.commit()
    return jsonify(car)


@app.route('/GET/total_sales', methods=["GET"])
def employees_sales():
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM employees")
    employees = [
        dict(id=row[0], name=row[1])
        for row in cursor.fetchall()
    ]
    getMoney = """
        SELECT SUM(price)
        FROM sales
        JOIN employees e on e.id = sales.employee_id
        JOIN carmodels c on c.id = sales.carmodel_id
        WHERE employee_id = ?
        """
    money = []
    for emp in enumerate(employees):
        index = emp[0]
        cursor.execute(getMoney, (index+1,))
        mon = cursor.fetchall()[0][0]
        money.append(mon)
    employeesWitMoney = []
    for i in enumerate(money):
        index = i[0]
        employees[index]["sales"] = money[index]
        employeesWitMoney.append(employees[index])
    return jsonify(employeesWitMoney)


@app.route('/GET/user/<string:username>', methods=["GET"])
def user(username):
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
    user = [
        dict(username=row[0], name=row[1], password=row[2], isEmplyee=row[3], connection=row[4])
        for row in cursor.fetchall()
    ]
    if user is not None:
        return jsonify(user)

@app.route('/POST/user', methods=["POST", "OPTIONS"])
def postUser():
    conn = db_connection()
    cursor = conn.cursor()
    username = request.form["username"]
    name = request.form["name"]
    password = request.form["password"]
    isEmployee = request.form["isEmployee"]
    connection = request.form["connection"]
    sql = """INSERT INTO users(username, name, password, isEmployee, connection) VALUES (?, ?, ?, ?, ?)"""
    cursor = cursor.execute(sql, ( username, name, password, isEmployee, connection))
    conn.commit()
    return jsonify("Everything ok")
