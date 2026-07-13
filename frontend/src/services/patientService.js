import api from './api';

export const patientService = {

  createPatient: async (patientData, doctorId) => {
    const response = await api.post(
      `/patients/create/${doctorId}`,
      patientData
    );
    return response.data;
  },

  getMyPatients: async (doctorId) => {
    const response = await api.get(`/patients/doctor/${doctorId}`);
    return response.data;
  },

  getAllPatients: async () => {
    const response = await api.get('/patients/all');
    return response.data;
  },

  getPatientById: async (id) => {
    const response = await api.get(`/patients/${id}`);
    return response.data;
  },

  updatePatient: async (id, patientData) => {
    const response = await api.put(`/patients/update/${id}`, patientData);
    return response.data;
  },

  deletePatient: async (id) => {
    const response = await api.delete(`/patients/delete/${id}`);
    return response.data;
  },
};