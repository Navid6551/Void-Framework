import { Router } from 'express';
import { getCharges } from './charges/getCharges';
import { IncidentRoute } from './incidents';
import { TagsRoute } from './tags';
import { StaffRoute } from './staffs';
import { ConfigRoute } from './config';
import { BusinessRoute } from './businesses';
import { ProfilesRoute } from './profiles';
import { EvidenceRoute } from './evidence';

export const MdtApi = Router();
//// Mdt Businesses
MdtApi.use(BusinessRoute)

//// Mdt Tags
MdtApi.use(TagsRoute)

//// Mdt Charges
MdtApi.use(getCharges)

//// Mdt Incidents
MdtApi.use(IncidentRoute)

//// Mdt Config
MdtApi.use(ConfigRoute)

//// Mdt Officers
MdtApi.use(StaffRoute)

//// Mdt Profiles
MdtApi.use(ProfilesRoute)

//// Mdt Evidence
MdtApi.use(EvidenceRoute)