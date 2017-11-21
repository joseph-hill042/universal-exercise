import Vue from 'vue';
import { Component } from 'vue-property-decorator';

interface Appointment {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    type: string;
    workRelated: boolean;
}

@Component
export default class HomeComponent extends Vue {
    appointments: Appointment[] = [];
    loaded = false;
    editing = false;

    booleanFilter = function (value: boolean, trueText: any, falseText: any) {
        return value ? 'Yes' : 'No';
    }

    dateFormat(value: any) {
        var date = value.split('-');
        var year = date.shift();
        date.push(year);
        return date.join('-');
    }

    timeFormat(value: any) {
        var minutes = value.slice(2);
        if (parseFloat(value) < 13) {
            return `${value} AM`;
        } else {
            switch (parseFloat(value)) {
                case 13:
                    return `1${minutes} PM`;
                case 14:
                    return `2${minutes} PM`;
                case 15:
                    return `3${minutes} PM`;
                case 16:
                    return `4${minutes} PM`;
                case 17:
                    return `5${minutes} PM`;
                case 18:
                    return `6${minutes} PM`;
                case 19:
                    return `7${minutes} PM`;
                case 20:
                    return `8${minutes} PM`;
                case 21:
                    return `9${minutes} PM`;
                case 22:
                    return `10${minutes} PM`;
                case 23:
                    return `11${minutes} PM`;
                case 24:
                    return `12${minutes} PM`;
                default:
            }
        }
    }

    deleteAppointment(appointment: Appointment) {
        fetch(`/api/appointments/${appointment.id}`, {
            method: 'delete',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        })
            .then(() => {
                this.appointments = this.appointments.filter((t) => t.id !== appointment.id);
            });
    }

    mounted() {
        fetch('api/appointments')
            .then(response => response.json() as Promise<Appointment[]>)
            .then(data => {
                this.appointments = data;
                this.loaded = true;
            });
    }
}