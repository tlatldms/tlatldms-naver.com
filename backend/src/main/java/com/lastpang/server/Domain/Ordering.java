package com.lastpang.server.Domain;


import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class Ordering {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer orderId;

    @ManyToOne
    @JoinColumn(name = "storeId", nullable = false, updatable = false)
    private Store store;
    private String request;

    @OneToOne
    @JoinColumn(name="username", nullable = false, updatable = false)
    private Member member;

    @CreationTimestamp
    private Date order_dt;

    private Integer orderStatus;

    private String menu1;
    private Integer quantity1;
    private Integer price1;


    private Integer totalPrice;

}
