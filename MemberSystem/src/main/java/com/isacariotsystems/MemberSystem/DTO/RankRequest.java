package com.isacariotsystems.MemberSystem.DTO;

import lombok.Data;

@Data
public class RankRequest {
    String name;
    String requirements;
    int daysRequired;
}
