package com.lastpang.server.Domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long storeId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false, updatable = false)
    private Member member;
    private String username;
    private String licenseNum;
    private float latitude;
    private float longitude;
    private String storeName;
    private String posName;
    private float avgRate;
    private String address;

}
