import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import VueRouter from 'vue-router';

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
export default class AddAppointmentComponent extends Vue {
    added: boolean = false;
    sendData(appointment:
        Appointment) {
        console.log(appointment);
        fetch('/api/appointments', {
            method: 'post',
            body: JSON.stringify(appointment),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json() as Promise<Appointment>)
            .then(data => {
                this.added = true;
            });
    }
    clear(obj: any) {
        for (var key in obj)
            if (obj.hasOwnProperty(key))
                obj[key] = "";
        this.$router.push('/');
    }
    data() {
        return {
            form: {
                title: '',
                description: '',
                date: '',
                time: '',
                type: '',
                workRelated: ''
            },
        }
    }
}