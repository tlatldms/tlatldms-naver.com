package com.lastpang.server.Repository;

import com.lastpang.server.Domain.Store;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreRepository extends CrudRepository<Store, Long> {

    List<Store> findStoresByMember_UserId(Long UserId);
    List<Store> findStoresByMember_Username(String username);
    Store findStoreByStoreId (Long storeId);
    Store findStoreByStoreName(String storeName);
}
