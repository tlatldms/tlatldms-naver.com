package com.lastpang.server.Repository;

import com.lastpang.server.Domain.Member;
import com.lastpang.server.Domain.Store;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StoreRepository extends CrudRepository<Store, Long> {

    List<Store> findStoreByMember_UserId(Long UserId);
    Store findStoreByStoreId (Long storeId);
}
