public class SimpleHeap {

    static int[] memory = new int[1024]; // our "RAM"
    static int nextFree = 0; // next free position

    // 📦 Allocate memory
    static int allocate(int priority, int value) {
        int start = nextFree;

        // Store object: [priority, refCount, dataLength, value]
        memory[start] = priority;
        memory[start + 1] = 1; // reference count
        memory[start + 2] = 1; // data length
        memory[start + 3] = value;

        nextFree += 4; // move pointer forward

        return start; // return pointer
    }

    // 🔍 Get priority using pointer
    static int getPriority(int pointer) {
        return memory[pointer];
    }

    // 🔍 Get value
    static int getValue(int pointer) {
        return memory[pointer + 3];
    }

    // 🔄 Release memory
    static void release(int pointer) {
        memory[pointer + 1]--; // reduce reference count

        if (memory[pointer + 1] == 0) {
            // clear memory
            for (int i = 0; i < 4; i++) {
                memory[pointer + i] = 0;
            }
        }
    }

    // 🔀 Simple bubble sort on pointers
    static void sort(int[] addressBook) {
        for (int i = 0; i < addressBook.length; i++) {
            for (int j = 0; j < addressBook.length - 1; j++) {

                int p1 = getPriority(addressBook[j]);
                int p2 = getPriority(addressBook[j + 1]);

                if (p1 > p2) {
                    // swap pointers
                    int temp = addressBook[j];
                    addressBook[j] = addressBook[j + 1];
                    addressBook[j + 1] = temp;
                }
            }
        }
    }

    // 🧹 Compaction (move everything left)
    static void compact(int[] addressBook) {
        int[] newMemory = new int[1024];
        int newIndex = 0;

        for (int i = 0; i < addressBook.length; i++) {
            int oldPtr = addressBook[i];

            if (memory[oldPtr + 1] > 0) { // still active
                // copy 4 values
                for (int j = 0; j < 4; j++) {
                    newMemory[newIndex + j] = memory[oldPtr + j];
                }

                // update pointer
                addressBook[i] = newIndex;

                newIndex += 4;
            }
        }

        memory = newMemory;
        nextFree = newIndex;
    }

    // 🚀 Test
    public static void main(String[] args) {

        int[] addressBook = new int[5];

        // allocate some records
        addressBook[0] = allocate(5, 100);
        addressBook[1] = allocate(2, 200);
        addressBook[2] = allocate(8, 300);
        addressBook[3] = allocate(1, 400);
        addressBook[4] = allocate(3, 500);

        System.out.println("Before sorting:");
        for (int ptr : addressBook) {
            System.out.println(getPriority(ptr) + " -> " + getValue(ptr));
        }

        sort(addressBook);

        System.out.println("\nAfter sorting:");
        for (int ptr : addressBook) {
            System.out.println(getPriority(ptr) + " -> " + getValue(ptr));
        }

        // simulate deleting one
        release(addressBook[2]);

        // compact memory
        compact(addressBook);

        System.out.println("\nAfter compaction:");
        for (int ptr : addressBook) {
            System.out.println(getPriority(ptr) + " -> " + getValue(ptr));
        }
    }
}
