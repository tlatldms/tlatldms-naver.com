package com.lastpang.server.Domain;

import lombok.Data;
import org.hibernate.annotations.*;

import javax.persistence.Entity;
import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;


    @Column(nullable=false, unique=true, length=20)
    private String username;

    private String phoneNumber;

    @Column(nullable=false, unique=true, length=50)
    private String email;

    private String password;

    private Short hostFlag;


    @CreationTimestamp
    private Date reg_dt;

    @UpdateTimestamp
    private Date updated_dt;
    private Date access_dt;

}
