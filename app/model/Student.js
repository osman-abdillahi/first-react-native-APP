export default class Student {
	name: "";
	grade: "";
	teacher: '';
	notes: '';
	course: '';
	semester: '';

	constructor(name="", grade="", teacher='', notes="", course="0", semester="") {
		this.name = name;
		this.grade = grade;
		this.teacher = teacher;
		this.notes = notes;
		this.course = course;
		this.semester = semester;
	}
}