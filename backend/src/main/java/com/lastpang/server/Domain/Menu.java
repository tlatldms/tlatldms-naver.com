package com.lastpang.server.Domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long menuId;
    private String menuName;
    private String menuImgLink;
    private Integer price;
    private String desc;
    private String options;

}
