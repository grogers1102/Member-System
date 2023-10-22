package com.isacariotsystems.MemberSystem.entity;

// Database Imports
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

// Java Imports
import java.io.Serializable;
import java.time.LocalDate;


/*
    @Embeddable indicates this is entity can be embedded in another entity 
    @Data generates getters and setters
    @AllArgsConstructor generate all arg constructors 
    @NoArgsConstructor generate no arg constructors
    @EqualsAndHashCode generates equal and hashCode methods
 */
@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class AttendanceID implements Serializable {

    //@Column specifies column name  in DB
    
    @Column(name="userId")
    private Long userId;

    @Column(name="date")
    private LocalDate date;
}
