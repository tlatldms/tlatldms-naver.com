package com.lastpang.server.Repository;

import com.lastpang.server.Domain.Menu;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepository extends CrudRepository<Menu, Long> {
    Menu findByMenuId(Long menuId);
}
