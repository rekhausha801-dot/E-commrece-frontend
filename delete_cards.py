import sys

file_path = "src/pages/admin/AddNewProduct.jsx"
with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

# Lines to delete: 729 to 977 (0-indexed: 728 to 976)
start_index = 728
end_index = 977

new_lines = lines[:start_index] + lines[end_index:]

with open(file_path, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Deleted cards 9 to 12")
