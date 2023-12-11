import requests
import json

api_key = "https://65766ddc0febac18d403e2e5.mockapi.io/api/"
datas = json.loads(open("courses.json", "r", encoding='utf-8').read())
users = json.loads(open("users.json", "r", encoding='utf-8').read())

for user in users:
    for dump in user["dumps"]:
        user[dump] = json.dumps(user[dump])
    del user["dumps"]
    
for data in datas:
    for dump in data["dumps"]:
        data[dump] = json.dumps(data[dump])
    del data["dumps"]

choice = -1
while choice != 0:
    print("1. Upload full data COURSES to API")
    print("2. Upload full data USERS to API")
    print("3.Load data COURSES from API")
    print("4.Load data USERS from API")
    print("0. Exit")
    choice = int(input("Your choice: "))
    if(choice == 1):
        for data in datas:
            res = requests.post(api_key + f"courses", data=data)
            print(res.text)
    elif(choice == 2):
        for user in users:
            res = requests.post(api_key + f"users", data=user)
            print(res.text)
    elif choice == 3:
        res = requests.get(api_key + "courses")
        data = res.json()
        for i in data:
            i["questions"] = json.loads(i["questions"])
            i["dumps"] = ["questions"]
        open('./courses.json','w',encoding='utf-8').write(json.dumps(data))
    elif choice == 4:
        res = requests.get(api_key + "users")
        data = res.json()
        for i in data:
            i["courses"] = json.loads(i["courses"])
            i["dumps"] = ["courses"]
        open('./users.json','w',encoding='utf-8').write(json.dumps(data))