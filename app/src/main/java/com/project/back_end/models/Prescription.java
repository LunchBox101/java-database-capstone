package com.project.back_end.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "prescriptions")
public class Prescription {

  @Id
  private String id;

  @NotNull
  @Size(min = 3, max = 100)
  private String patientName;

  @NotNull
  private Long appointmentId;

  @NotNull
  @Size(min = 3, max = 100)
  private String medication;

  @NotNull
  @Size(min = 1, max = 50)
  private String dosage;

  @Size(max = 500)
  private String doctorNotes;

  @Min(value = 0, message = "Refill count cannot be negative")
  @Max(value = 12, message = "Refill count cannot exceed 12")
  @JsonProperty("refillCount")
  private int refillCount;

  @Size(max = 150, message = "Pharmacy name must not exceed 150 characters")
  private String pharmacyName;

  public Prescription() {}

  public Prescription(String patientName, String medication, String dosage, String doctorNotes, Long appointmentId) {
    this.patientName = patientName;
    this.medication = medication;
    this.dosage = dosage;
    this.doctorNotes = doctorNotes;
    this.appointmentId = appointmentId;
  }

  public String getId() { return id; }
  public void setId(String id) { this.id = id; }

  public String getPatientName() { return patientName; }
  public void setPatientName(String patientName) { this.patientName = patientName; }

  public Long getAppointmentId() { return appointmentId; }
  public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }

  public String getMedication() { return medication; }
  public void setMedication(String medication) { this.medication = medication; }

  public String getDosage() { return dosage; }
  public void setDosage(String dosage) { this.dosage = dosage; }

  public String getDoctorNotes() { return doctorNotes; }
  public void setDoctorNotes(String doctorNotes) { this.doctorNotes = doctorNotes; }

  public int getRefillCount() { return refillCount; }
  public void setRefillCount(int refillCount) { this.refillCount = refillCount; }

  public String getPharmacyName() { return pharmacyName; }
  public void setPharmacyName(String pharmacyName) { this.pharmacyName = pharmacyName; }
}
