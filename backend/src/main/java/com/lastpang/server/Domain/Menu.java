package com.lastpang.server.Domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer menuId;

    @ManyToOne
    @JoinColumn(name = "storeId", nullable = false, updatable = false)
    private Store store;

    private String menuName;
    private String menuImgUuid;
    private Integer price;
    private String description;
    private String options;


}
