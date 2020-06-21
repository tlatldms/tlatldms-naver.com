package com.lastpang.server.Repository;


import com.lastpang.server.Domain.Ordering;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends CrudRepository<Ordering, Long> {

    List<Ordering> findOrderingsByStore_StoreId (Integer storeId);
}
