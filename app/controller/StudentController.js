import Student from '../models/Student.js';
import { observable, action } from 'mobx';

class StudentController {
	@observable studentLst = [];

	@action setStudentList(studentLst) {
		if(studentLst != null)
			this.studentLst = studentLst;
	}

	@action getStudentList() {
		return this.studentLst != null ? this.studentLst : new Student();	
	}
}

const studentController = new StudentController();

export default studentController;