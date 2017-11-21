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
export default class EditAppointmentComponent extends Vue {
    appointment: Appointment;
    loaded = false;
    updated = false;

    data() {
        return {
            form: {
                id: 1,
                name: "Rob"
            }
        }
    }

    mounted() {
        fetch(`/api/appointments/${this.$route.params.id}`)
            .then(response => response.json() as Promise<Appointment>)
            .then(data => {
                this.appointment = data;
                this.loaded = true;
            });
    }
    clearForm() {
        this.$router.push('/');
    }

    updateAppointment(appointment: Appointment) {
        fetch(`/api/appointments/${appointment.id}`, {
            method: 'put',
            body: JSON.stringify(appointment),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        })
            .then((res) => {
                this.updated = true;
            });
    }
}