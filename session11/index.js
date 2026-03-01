const students = [
  { id: 1, name: "Nguyen Van An", age: 20, gpa: 8.5, status: "active" },
  { id: 2, name: "Tran Thi Bich", age: 17, gpa: 7.2, status: "active" },
  { id: 3, name: "Le Hoang Cuong", age: 22, gpa: 9.1, status: "inactive" },
  { id: 4, name: "Pham Thi Dung", age: 19, gpa: 6.8, status: "active" }
];

// ===== Validation Helpers =====
function inputNumber(message, min = -Infinity, max = Infinity) {
  const value = Number(prompt(message));
  if (Number.isNaN(value)) {
    alert("Giá trị phải là số.");
    return null;
  }
  if (value < min || value > max) {
    alert(`Giá trị phải trong khoảng ${min} - ${max}`);
    return null;
  }
  return value;
}

function inputString(message) {
  const value = prompt(message);
  if (!value || value.trim() === "") {
    alert("Không được để trống.");
    return null;
  }
  return value.trim();
}

function inputStatus(message) {
  const value = prompt(message);
  if (value !== "active" && value !== "inactive") {
    alert("Status phải là active hoặc inactive");
    return null;
  }
  return value;
}

function findIndexById(id) {
  return students.findIndex(s => s.id === id);
}

function formatTable(data) {
  if (data.length === 0) return "No records.";
  let out = "ID | NAME | AGE | GPA | STATUS\n";
  out += "--------------------------------\n";
  data.forEach(s => {
    out += `${s.id} | ${s.name} | ${s.age} | ${s.gpa} | ${s.status}\n`;
  });
  return out;
}

// ===== 1. Create Student =====
function createStudent() {
  const id = inputNumber("Nhập id:", 1);
  if (id === null) return;

  if (findIndexById(id) !== -1) {
    alert("ID đã tồn tại");
    return;
  }

  const name = inputString("Nhập tên:");
  if (!name) return;

  const age = inputNumber("Nhập tuổi:", 0, 150);
  if (age === null) return;

  const gpa = inputNumber("Nhập GPA:", 0, 10);
  if (gpa === null) return;

  const status = inputStatus("Nhập status (active/inactive):");
  if (!status) return;

  students.push({ id, name, age, gpa, status });
  alert("Tạo sinh viên thành công");
}

// ===== 2. Read All Students =====
function readAllStudents() {
  if (students.length === 0) {
    alert("Không có sinh viên");
    return;
  }
  const table = formatTable(students);
  console.log(table);
  alert(table);
}

// ===== 3. Filter Scholarship Candidates =====
function filterScholarship() {
  const list = students.filter(s => s.gpa > 8);
  if (list.length === 0) {
    alert("Không có sinh viên học bổng");
    return;
  }
  const table = formatTable(list);
  console.log(table);
  alert(table);
}

// ===== 4. Update Student =====
function updateStudent() {
  const id = inputNumber("Nhập id cần sửa:", 1);
  if (id === null) return;

  const idx = findIndexById(id);
  if (idx === -1) {
    alert("Không tìm thấy sinh viên");
    return;
  }

  const name = inputString("Nhập tên mới:");
  if (!name) return;

  const gpa = inputNumber("Nhập GPA mới:", 0, 10);
  if (gpa === null) return;

  students[idx].name = name;
  students[idx].gpa = gpa;

  alert("Cập nhật thành công");
}

// ===== 5. Delete Student =====
function deleteStudent() {
  const id = inputNumber("Nhập id cần xóa:", 1);
  if (id === null) return;

  const idx = findIndexById(id);
  if (idx === -1) {
    alert("Không tìm thấy sinh viên");
    return;
  }

  students.splice(idx, 1);
  alert("Xóa thành công");
}

// ===== 6. Compliance Verification =====
function complianceVerification() {
  if (students.length === 0) {
    alert("Danh sách rỗng");
    return;
  }

  const hasMinor = students.some(s => s.age < 18);
  const allActive = students.every(s => s.status === "active");

  const msg = `Có sinh viên <18: ${hasMinor}\nTất cả active: ${allActive}`;
  console.log(msg);
  alert(msg);
}

// ===== 7. Academic Statistics =====
function academicStatistics() {
  if (students.length === 0) {
    alert("Danh sách rỗng");
    return;
  }

  const avg = students.reduce((sum, s) => sum + s.gpa, 0) / students.length;
  const msg = `GPA trung bình: ${avg.toFixed(2)}`;
  console.log(msg);
  alert(msg);
}

// ===== 8. Data Normalization =====
function dataNormalization() {
  if (students.length === 0) {
    alert("Danh sách rỗng");
    return;
  }

  const normalized = students.map(s => ({ ...s, name: s.name.toUpperCase() }));
  const table = formatTable(normalized);
  console.log(table);
  alert(table);
}

// ===== Menu =====
function menu() {
  let choice;
  do {
    choice = inputNumber(
      "===== MENU =====\n" +
      "1. Create Student\n" +
      "2. Read All Students\n" +
      "3. Filter Scholarship\n" +
      "4. Update Student\n" +
      "5. Delete Student\n" +
      "6. Compliance Verification\n" +
      "7. Academic Statistics\n" +
      "8. Data Normalization\n" +
      "0. Exit",
      0,
      8
    );

    if (choice === null) continue;

    switch (choice) {
      case 1:
        createStudent();
        break;
      case 2:
        readAllStudents();
        break;
      case 3:
        filterScholarship();
        break;
      case 4:
        updateStudent();
        break;
      case 5:
        deleteStudent();
        break;
      case 6:
        complianceVerification();
        break;
      case 7:
        academicStatistics();
        break;
      case 8:
        dataNormalization();
        break;
      case 0:
        alert("Thoát");
        break;
    }
  } while (choice !== 0);
}

menu();
