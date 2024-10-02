package com.prove.angularstarterkit.angular_prefill_starter_kit_v3.service;

import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.dto.v3ChallengeRequestDTO;
import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.dto.v3CompleteRequestDTO;
import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.dto.v3StartRequestDTO;
import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.dto.v3ValidaRequestDTO;
import com.prove.proveapi.models.components.V3ChallengeResponse;
import com.prove.proveapi.models.components.V3CompleteResponse;
import com.prove.proveapi.models.components.V3StartResponse;
import com.prove.proveapi.models.components.V3ValidateResponse;

public interface v3IdentityVerification {
  IdentityV3Response<V3StartResponse> startRequest(v3StartRequestDTO startRequest) throws Exception;

  IdentityV3Response<V3ValidateResponse> validateRequest(v3ValidaRequestDTO validaRequest) throws Exception;

  IdentityV3Response<V3ChallengeResponse> challengeRequest(v3ChallengeRequestDTO challengeRequest) throws Exception;

  IdentityV3Response<V3CompleteResponse> completeRequest(v3CompleteRequestDTO completeRequest) throws Exception;
}
