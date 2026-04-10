tasks = []

def add_task(description):
    task = {'description': description, 'done': False}
    tasks.append(task)
    print("Task added successfully!")

def view_tasks():
    if not tasks:
        print("No tasks found.")
        return
    for i, task in enumerate(tasks, 1):
        status = "[✓]" if task['done'] else "[ ]"
        print(f"{i}. {status} {task['description']}")

def mark_done(index):
    if 1 <= index <= len(tasks):
        tasks[index - 1]['done'] = True
        print("Task marked as done!")
    else:
        print("Invalid task number.")

def delete_task(index):
    if 1 <= index <= len(tasks):
        deleted = tasks.pop(index - 1)
        print(f"Task '{deleted['description']}' deleted!")
    else:
        print("Invalid task number.")

def main():
    while True:
        print("\nTask Manager")
        print("1. Add Task")
        print("2. View Tasks")
        print("3. Mark Task as Done")
        print("4. Delete Task")
        print("5. Exit")
        choice = input("Choose an option: ")
        if choice == '1':
            desc = input("Enter task description: ")
            add_task(desc)
        elif choice == '2':
            view_tasks()
        elif choice == '3':
            view_tasks()
            try:
                idx = int(input("Enter task number to mark as done: "))
                mark_done(idx)
            except ValueError:
                print("Please enter a valid number.")
        elif choice == '4':
            view_tasks()
            try:
                idx = int(input("Enter task number to delete: "))
                delete_task(idx)
            except ValueError:
                print("Please enter a valid number.")
        elif choice == '5':
            break
        else:
            print("Invalid choice. Try again.")

if __name__ == "__main__":
    main()