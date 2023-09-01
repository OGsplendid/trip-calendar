import moment from 'moment/moment';

export default class Widget {
  constructor(element) {
    this.element = element;
    this.form = this.element.querySelector('.form');

    this.switchPlaces = this.switchPlaces.bind(this);
    this.onDateCheck = this.onDateCheck.bind(this);
    this.switchDestinations = this.switchDestinations.bind(this);
    this.setActualDate = this.setActualDate.bind(this);

    this.form.addEventListener('click', this.switchDestinations);
    this.form.addEventListener('change', this.onDateCheck);
    this.form.checkbox.addEventListener('change', this.switchPlaces);
    this.form.addEventListener('click', this.setActualDate);
  }

  setActualDate() {
    const now = moment().format('YYYY-MM-DD');
    this.form.inputdateto.setAttribute('min', now);
    this.form.oneway.setAttribute('min', now);
    this.form.inputdatefrom.setAttribute('min', this.form.inputdateto.value);
  }

  switchDestinations(e) {
    if (e.target.classList.contains('arrows-image')) {
      const oldPlace = this.form.inputfrom.value;
      const newPlace = this.form.inputto.value;
      this.form.inputfrom.value = newPlace;
      this.form.inputto.value = oldPlace;
    }
  }

  switchPlaces() {
    if (this.form.checkbox.checked) {
      this.form.querySelector('.oneway').classList.toggle('hidden');
      this.form.querySelector('.bothways').classList.toggle('hidden');
      if (this.form.oneway.value) {
        this.form.inputdateto.value = this.form.oneway.value;
      }
      return;
    }
    this.form.querySelector('.oneway').classList.toggle('hidden');
    this.form.querySelector('.bothways').classList.toggle('hidden');
  }

  onDateCheck(e) {
    if (e.target.closest('.input').type === 'date') {
      console.log(e.target.closest('.input').value);
    }
    console.log(this.form.inputdateto.value - this.form.inputdatefrom.value);
  }
}
