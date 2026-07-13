import api from './api';

export const scanService = {

  uploadScan: async (file, patientId, doctorId, scanType, notes) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('patientId', patientId);
    formData.append('doctorId', doctorId);
    formData.append('scanType', scanType);
    if (notes) formData.append('notes', notes);

    const response = await api.post('/scans/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getScansByDoctor: async (doctorId) => {
    const response = await api.get(`/scans/doctor/${doctorId}`);
    return response.data;
  },

  getScansByPatient: async (patientId) => {
    const response = await api.get(`/scans/patient/${patientId}`);
    return response.data;
  },

  getScanById: async (id) => {
    const response = await api.get(`/scans/${id}`);
    return response.data;
  },

  getDoctorStats: async (doctorId) => {
    const response = await api.get(`/scans/stats/${doctorId}`);
    return response.data;
  },
};