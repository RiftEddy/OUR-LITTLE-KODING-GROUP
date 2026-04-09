def add_new_entry():
    name = input("Eenter the name to add: ").strip()
    if not name:
        print("Name cannot be empty.")
        return
    with open('registry.txt', 'a') as file:
        file.write(f"{name},active\n")
    print(f"Added {name} with status active.")

def flip_status():
    name = input("Enter the name to FFlip status: ").strip()
    if not name:
        print("Name cannot be empty.")
        return
    lines = []
    found = False
    with open('registry.txt', 'r') as file:
        for line in file:
            parts = line.strip().split(',')
            if len(parts) == 2:
                current_name, status = parts
                if current_name.strip() == name:
                    if status.strip() == 'active':
                        new_status = 'inactive'
                    elif status.strip() == 'inactive':
                        new_status = 'active'
                    else:
                        print(f"Invalid status for {name}.")
                        return
                    lines.append(f"{current_name},{new_status}\n")
                    found = True
                else:
                    lines.append(line)
            else:
                lines.append(line)  
    if not found:
        print("User not found")
        return
    with open('registry.txt', 'w') as file:
        file.writelines(lines)
    print(f"Flipped status for {name}.")

def main():
    while True:
        print("\n1. Add new entry")
        print("2. Flip status")
        print("3. Exit")
        choice = input("Choose an option: ").strip()
        if choice == '1':
            add_new_entry()
        elif choice == '2':
            flip_status()
        elif choice == '3':
            break
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    main()
