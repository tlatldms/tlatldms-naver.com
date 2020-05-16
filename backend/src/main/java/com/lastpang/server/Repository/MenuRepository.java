package com.lastpang.server.Repository;

import com.lastpang.server.Domain.Menu;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepository extends CrudRepository<Menu, Long> {
    Menu findByMenuId(Long menuId);
    List<Menu> findMenusByStore_StoreName(String storename);
}
