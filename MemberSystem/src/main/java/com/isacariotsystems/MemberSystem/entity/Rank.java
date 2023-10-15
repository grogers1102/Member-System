package com.isacariotsystems.MemberSystem.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rank {
    @Id
    private Long rankId;

    private String description;

    private String requirements;
    
    private int daysRequired;
}
