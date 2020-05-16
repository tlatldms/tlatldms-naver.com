package com.lastpang.server.Repository;

import com.lastpang.server.Domain.Store;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreRepository extends CrudRepository<Store, Long> {

    List<Store> findStoreByMember_UserId(Long UserId);
    Store findStoreByStoreId (Long storeId);
    Store findStoreByStoreName(String storeName);
}
